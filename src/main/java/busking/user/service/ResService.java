package busking.user.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import busking.user.model.dto.ResDto;
import busking.user.model.mapper.ResMapper;

import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.Random;

@Service
public class ResService {

    @Autowired
    private ResMapper resMapper;

    public List<String> getStart() {
        return resMapper.getStart();
    }

    public List<String> getLocation(String startdate) {
        return resMapper.getLocation(startdate);
    }

    public List<Map<Object, Object>> getStartTime(String startdate, String dest) {
        return resMapper.getStartTime(startdate, dest);
    }

    //    public List<String> getSeat(String startdate, String dest, String starttime, int timeid) {
//        return resMapper.getSeat(startdate, dest, starttime, timeid);
//    }
    public List<Map<String, Object>> getResvDetail(int timeid) {
        return resMapper.getResvDetail(timeid);
    }

    public int calculatePrice(String startdate, String dest, String starttime) {
        try {
            // btprice와 locprice를 각각 매퍼에서 조회
            int btprice = resMapper.getBtprice(startdate, dest, starttime);
            int locprice = resMapper.getLocprice(dest);

            // rprice는 btprice + locprice로 계산
            int rprice = btprice + locprice;

            // 계산된 rprice만 반환
            return rprice;
        } catch (Exception e) {
            e.printStackTrace();  // 예외 로그 출력
            return 0;  // 예외 발생 시 0을 반환
        }
    }

    public ResDto getTimeInfo(int timeid) {
        try {
            return resMapper.getTimeInfo(timeid);
        } catch (Exception e) {
            System.out.println(e);
            return null;
        }
    }

    public int Reservation(ResDto resDto) {
        try {
            int locid = resMapper.getLocId(resDto.getDest());
            resDto.setLocid(locid);

            int timeid = resMapper.getTimeId(resDto.getStarttime(), resDto.getStartdate(), resDto.getDest());
            resDto.setTimeid(timeid);

            int btprice = resMapper.getBtprice(resDto.getStartdate(), resDto.getDest(), resDto.getStarttime());
            resDto.setBtprice(btprice);

            int locprice = resMapper.getLocprice(resDto.getDest());
            resDto.setLocprice(locprice);

            resDto.setTotal(btprice, locprice);

            int total = resDto.getTotal();

            resMapper.Res(resDto);

            int resvid = resDto.getResvid();
            for (Integer bsnum : resDto.getBsnum()) {
                resMapper.ResDetail(bsnum, resvid, resDto.getStartdate(), resDto.getStarttime(), resDto.getDest());
            }

            System.out.println(resDto);
            return resvid;
        } catch (Exception e) {
            System.out.println(e);
            return 0;
        }
    }

    public boolean getState(int resvid) {
        return resMapper.getState(resvid);
    }
    public int autoReserve(ResDto resDto) {
        try {
            // 목적지에 해당하는 locid 조회
            int locid = resMapper.getLocId(resDto.getDest());
            resDto.setLocid(locid);

            // timeid를 먼저 조회
            int timeid = resMapper.getTimeId(resDto.getStarttime(), resDto.getStartdate(), resDto.getDest());
            resDto.setTimeid(timeid);

            // 좌석 금액을 불러와서 총 금액 계산
            int btprice = resMapper.getBtprice(resDto.getStartdate(), resDto.getDest(), resDto.getStarttime());
            resDto.setBtprice(btprice);

            int locprice = resMapper.getLocprice(resDto.getDest());
            resDto.setLocprice(locprice);

            resDto.setTotal(btprice, locprice);

            // 만약 bsnum이 비어 있으면 서버에서 랜덤으로 좌석을 선택
            if (resDto.getBsnum() == null || resDto.getBsnum().isEmpty()) {
                // 좌석 번호를 자동으로 선택하기 위한 로직 추가
                List<Integer> availableSeats = resMapper.getAvailableSeats(resDto.getStartdate(), resDto.getStarttime(), resDto.getDest(), resDto.getTimeid()); // 가능한 좌석 목록을 가져옴

                if (availableSeats.isEmpty()) {
                    throw new IllegalArgumentException("예약할 수 있는 좌석이 없습니다.");
                }

                // 좌석 번호 리스트에서 하나를 랜덤으로 선택
                Random random = new Random();
                int randomIndex = random.nextInt(availableSeats.size());  // 랜덤으로 인덱스를 선택
                int selectedSeat = availableSeats.get(randomIndex);  // 선택된 인덱스에 해당하는 좌석 번호
                resDto.setBsnum(Collections.singletonList(selectedSeat));  // 랜덤으로 선택한 좌석
            }

            // 예약 정보 DB에 삽입
            int resvid = resMapper.Res(resDto);  // 예약 정보 삽입
            int resid = resDto.getResvid();

            // 예약 상세 정보 삽입
            for (Integer bsnum : resDto.getBsnum()) {
                resMapper.ResDetail(bsnum, resid, resDto.getStartdate(), resDto.getStarttime(), resDto.getDest());
            }

            return resid;  // 예약 ID를 반환
        } catch (Exception e) {
            System.out.println(e);
            return 0;  // 예외 발생 시 0을 반환
        }
    }
}
package busking.user.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import busking.user.model.dto.ResDto;
import busking.user.model.mapper.ResMapper;

import java.util.List;
import java.util.Map;

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

    public List<Map<Object,Object>> getStartTime(String startdate, String dest) {
        return resMapper.getStartTime(startdate, dest);
    }

//    public List<String> getSeat(String startdate, String dest, String starttime, int timeid) {
//        return resMapper.getSeat(startdate, dest, starttime, timeid);
//    }
    public List<Map<String,Object>> getResvDetail(int timeid) {
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
}
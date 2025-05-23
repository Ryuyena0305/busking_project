package busking.user.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import busking.user.model.dto.ResDto;
import busking.user.model.mapper.ResMapper;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.*;

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
            int btprice = resMapper.getBtprice(startdate, dest, starttime);

            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
            LocalDate date = LocalDate.parse(startdate, formatter);

            if (date.getDayOfWeek() == DayOfWeek.SATURDAY || date.getDayOfWeek() == DayOfWeek.SUNDAY) {
                btprice += 2000;
            }

            int locprice = resMapper.getLocprice(dest);

            int rprice = btprice + locprice;

            return rprice;
        } catch (Exception e) {
            e.printStackTrace();
            return 0;
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

            System.out.println(timeid);

            if (resDto.getBsnum().isEmpty() || resDto.getBsnum().get(0) == 0) {
                Set<Integer> unavailableSeats = new HashSet<>();
                unavailableSeats.addAll(resMapper.getResvDetail2(timeid));
                unavailableSeats.addAll(resMapper.onGet(timeid));

                if (unavailableSeats.size() == 55) {
                    throw new IllegalArgumentException("예약할 수 있는 좌석이 없습니다.");
                }
                int person = resDto.getBsnum().size();
                List<Integer> list = new ArrayList<>();
                for (int i = 1; i <= 55; i++) {
                    if (!unavailableSeats.contains(i)) {
                        list.add(i);
                        unavailableSeats.add(i);
                        break;
                    }
                }
                int i = list.get(0);
                while (list.size() < person && i < 55) {
                    i++;
                    if (!unavailableSeats.contains(i)) {
                        list.add(i);
                        unavailableSeats.add(i);
                    }
                }
                resDto.setBsnum(list);
                System.out.println(resDto.getBsnum());
            }
            resMapper.Res(resDto);
            int resvid = resDto.getResvid();
            for (int bsnum : resDto.getBsnum()) {
                resMapper.ResDetail(bsnum, resvid, resDto.getStartdate(), resDto.getStarttime(), resDto.getDest());
            }
            return resvid;
        } catch (Exception e) {
            return 0;
        }
    }

    public boolean getState(int resvid) {
        return resMapper.getState(resvid);
    }
}
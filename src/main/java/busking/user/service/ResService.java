package busking.user.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import busking.user.model.dto.ResDto;
import busking.user.model.mapper.ResMapper;

import java.util.List;

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

    public List<String> getStartTime(String startdate, String dest) {
        return resMapper.getStartTime(startdate, dest);
    }

    public List<String> getSeat(String startdate, String dest, String starttime) {
        return resMapper.getSeat(startdate, dest, starttime);
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

            int totalPrice = resDto.getTotal() * resDto.getBsnum().size();
            resDto.setRprice(totalPrice);

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
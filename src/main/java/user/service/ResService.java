package user.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import user.model.mapper.ResMapper;

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
}
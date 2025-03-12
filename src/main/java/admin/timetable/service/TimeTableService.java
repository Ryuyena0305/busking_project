package admin.timetable.service;

import admin.timetable.model.dto.TimeTableDto;
import admin.timetable.model.mapper.TimeTableMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TimeTableService {
    @Autowired
    private TimeTableMapper timeTableMapper;


    // 스케줄 등록
    public boolean create(TimeTableDto timeTableDto){
        return timeTableMapper.create(timeTableDto);
    }

    // 스케줄 상세 조회(겸용)
    public TimeTableDto view(String timeid){
        return timeTableMapper.view(timeid);
    }

    // 스케줄 수정
    public boolean update(TimeTableDto timeTableDto){
        return timeTableMapper.update(timeTableDto);
    }

    // 스케줄 삭제
    public boolean delete(String timeid){
        return timeTableMapper.delete(timeid);
    }

    // (도착지별)스케줄 조회
    public List<TimeTableDto> locView(int locid){
        return timeTableMapper.locView(locid);
    }

    // (버스별)스케줄 조회
    public List<TimeTableDto> busView(int biid){
        return timeTableMapper.busView(biid);
    }

    // (일자별)스케줄 조회
    public List<TimeTableDto> dateView(String startdate){
        return timeTableMapper.dateView(startdate);
    }

}

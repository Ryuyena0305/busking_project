package admin.timetable.service;

import admin.timetable.model.dto.TimeTableDto;
import admin.timetable.model.mapper.TimeTableMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class TimeTableService {
    @Autowired
    private TimeTableMapper timetableMapper;


    // 스케줄 등록
    public boolean create(TimeTableDto timeTableDto){
        return timetableMapper.create(timeTableDto);
    }

    // 스케줄 상세 조회(겸용)
    public TimeTableDto view(String timeid){
        return timetableMapper.view(timeid);
    }

    // 스케줄 수정
    public boolean update(TimeTableDto timeTableDto){
        return timetableMapper.update(timeTableDto);
    }

    // 스케줄 삭제
    public boolean delete(String timeid){
        return timetableMapper.delete(timeid);
    }

    // (도착지별)스케줄 조회
    // (버스별)스케줄 조회
    // (일자별)스케줄 조회

}

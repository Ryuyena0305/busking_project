package busking.admin.timetable.service;

import busking.admin.timetable.model.dto.TimeTableDto;
import busking.admin.timetable.model.mapper.TimeTableMapper;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TimeTableService {
    private final TimeTableMapper timeTableMapper;



    // 버스 정보 가져오기
    public List<TimeTableDto> getBusInfo(){
        return timeTableMapper.getBusInfo();
    }

    // 터미널 정보 가져오기
    public List<TimeTableDto> getLoc(){
        return timeTableMapper.getLoc();
    }

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
    public PageInfo<TimeTableDto> locView(int locid, int pageNum, int pageSize){
        PageHelper.startPage(pageNum, pageSize); // 페이징 적용
        List<TimeTableDto> schedules = timeTableMapper.locView(locid); // MyBatis 호출
        return new PageInfo<>(schedules); // 페이징 정보를 포함한 PageInfo 반환
    }

    // (버스별)스케줄 조회
    public PageInfo<TimeTableDto> busView(int biid, int pageNum, int pageSize){
        PageHelper.startPage(pageNum, pageSize);
        List<TimeTableDto> schedules = timeTableMapper.busView(biid);
        return new PageInfo<>(schedules);
    }

    // (일자별)스케줄 조회
    public PageInfo<TimeTableDto> dateView(String startdate, int pageNum, int pageSize){
        PageHelper.startPage(pageNum, pageSize);
        List<TimeTableDto> schedules = timeTableMapper.dateView(startdate);
        return new PageInfo<>(schedules);
    }

}

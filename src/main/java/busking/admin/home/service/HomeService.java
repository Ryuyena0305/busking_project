package busking.admin.home.service;

import busking.admin.home.model.mapper.HomeMapper;
import busking.admin.timetable.model.dto.TimeTableDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class HomeService {
    private final HomeMapper homeMapper;

    // 지난달 우수 버스기사 조회
    public List<TimeTableDto> getBestDriver(){
        return homeMapper.getBestDriver();
    }




    // 차트 일자별 스케줄 건수 가져오기
    public Map<String, Integer> getDateChart(){
        return homeMapper.getDateChart();
    }
}

package busking.admin.home.service;

import busking.admin.home.model.mapper.HomeMapper;
import busking.admin.timetable.model.dto.TimeTableDto;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class HomeService {
    private final HomeMapper homeMapper;

    // 지난달 우수 버스기사 조회
    // @Scheduled( cron = "*/5 * * * * *") 테스트용
    @Scheduled(cron = "0 0 0 1 * *")
    public List<TimeTableDto> getBestDriver(){
        System.out.println("=========== 매월 1일 : 랭킹이 갱신되었습니다 ===========");
        return homeMapper.getBestDriver();
    }

    // 차트 일자별 스케줄 건수 가져오기
    @Scheduled(cron = "0 0 0 * * *")
    public List<TimeTableDto> getDateChart(){
        System.out.println("=========== 매일 자정 : 차트가 갱신되었습니다 ===========");
        return homeMapper.getDateChart();
    }
}

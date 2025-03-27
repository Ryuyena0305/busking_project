package busking.admin.home.controller;

import busking.admin.home.service.HomeService;
import busking.admin.timetable.model.dto.TimeTableDto;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/home")
@RequiredArgsConstructor
public class HomeController {
    private final HomeService homeService;


    // 지난달 우수 버스기사 조회
    @GetMapping("/bestdriver")
    public List<TimeTableDto> getBestDriver() {
        return homeService.getBestDriver();
    }


    // 차트 일자별 스케줄 건수 가져오기
    @GetMapping("/datechart")
    public Map<String, Integer> getDateChart() {
        System.out.println("TimeTableController.getDateChart");
        return homeService.getDateChart();
    }


}

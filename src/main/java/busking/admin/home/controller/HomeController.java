package busking.admin.home.controller;

import busking.admin.home.service.HomeService;
import busking.admin.timetable.model.dto.TimeTableDto;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
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
        System.out.println("HomeController.getBestDriver");
        return homeService.getBestDriver();
    }

    // 랭크 로그 DB에 저장하기
//    @PostMapping("/bestdriver")


    // 차트 일자별 스케줄 건수 가져오기
    @GetMapping("/datechart")
    public List<TimeTableDto> getDateChart() {
        System.out.println("HomeController.getDateChart");
        return homeService.getDateChart();
    }


}

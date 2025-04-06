package busking.admin.home.controller;

import busking.admin.home.service.HomeService;
import busking.admin.timetable.model.dto.TimeTableDto;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/home")
@RequiredArgsConstructor
public class HomeController {
    private final HomeService homeService;

    @PostMapping("/logtest")
    public void testRankLog() throws Exception {
        homeService.logBestDriver();
        System.out.println("저장 테스트");
    }


    // 지난달 우수 버스기사 조회
    @GetMapping("/bestdriver")
    public List<TimeTableDto> getBestDriver() {
        System.out.println("HomeController.getBestDriver");
        try{
            return homeService.getBestDriver();
        }catch (Exception e){
            System.out.println(e);
        }
        return null;
    }

    // 랭크 로그 파일 다운로드
    @GetMapping("/download/ranklog")
    public void  downloadCsv(HttpServletResponse response) throws Exception {
        Path filePath = Paths.get(System.getProperty("user.dir"),
                "build", "resources", "main", "static", "logs", "driver-rank-log.csv");

        if (!Files.exists(filePath) || Files.size(filePath) == 0) {
            response.setContentType("text/plain;charset=UTF-8");
            response.getWriter().write("NO_FILE");
            return;
        }

        response.setContentType("text/csv");
        response.setHeader("Content-Disposition", "attachment; filename=driver-rank-log.csv");
        Files.copy(filePath, response.getOutputStream());
        response.getOutputStream().flush();

    }



    // 차트 일자별 스케줄 건수 가져오기
    @GetMapping("/datechart")
    public List<TimeTableDto> getDateChart() {
        System.out.println("HomeController.getDateChart");
        return homeService.getDateChart();
    }


}

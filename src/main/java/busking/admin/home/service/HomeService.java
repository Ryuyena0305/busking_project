package busking.admin.home.service;

import busking.admin.home.model.mapper.HomeMapper;
import busking.admin.timetable.model.dto.TimeTableDto;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardOpenOption;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class HomeService {
    private final HomeMapper homeMapper;

    // 지난달 우수 버스기사 조회
    @Scheduled(cron = "0 0 0 1 * *")
    public List<TimeTableDto> getBestDriver() throws Exception{
        System.out.println("=========== 매월 1일 : 랭킹이 갱신되었습니다 ===========");
        return homeMapper.getBestDriver();
    }

    // 로깅처리
//    @Scheduled(cron = "0 1 0 1 * *")
    public void logBestDriver() throws Exception {
        List<TimeTableDto> topDrivers = getBestDriver(); // 위 서비스 재사용

        String baseDir = System.getProperty("user.dir"); // 현재 프로젝트 기준 경로
        Path logFile = Paths.get(baseDir, "build", "resources", "main", "static", "logs", "driver-rank-log.csv");

        if (!Files.exists(logFile)) {
            Files.createDirectories(logFile.getParent());
            Files.createFile(logFile);
            Files.write(logFile, "timestamp,rank,dname,timecount\n".getBytes(), StandardOpenOption.APPEND);
        }

        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM");
        String timestamp = LocalDate.now().minusMonths(1).format(formatter);

        for (TimeTableDto dto : topDrivers) {
            String line = String.format("%s,%d,%s,%d%n",
                    timestamp,
                    dto.getRankno(),
                    dto.getDname(),
                    dto.getTimecount());
            Files.write(logFile, line.getBytes(), StandardOpenOption.APPEND);
        }

        System.out.println("=========== 매월 1일 : CSV 로그 저장 완료 ===========");
    }




    // 차트 일자별 스케줄 건수 가져오기
    @Scheduled(cron = "0 0 0 * * *")
    public List<TimeTableDto> getDateChart(){
        System.out.println("=========== 매일 자정 : 차트가 갱신되었습니다 ===========");
        return homeMapper.getDateChart();
    }
}

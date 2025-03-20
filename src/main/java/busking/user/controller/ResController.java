package busking.user.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import busking.user.model.dto.ResDto;
import busking.user.service.ResService;

import java.util.List;

@RestController
@RequestMapping("/resv")
@CrossOrigin("http://localhost:5173")
public class ResController {

    @Autowired
    private ResService resService;

    @GetMapping("/date")
    public List<String> getDates() {
        return resService.getStart();
    }

    @GetMapping("/dest")
    public List<String> getLocation(@RequestParam("startdate") String startdate) {
        return resService.getLocation(startdate);
    }

    @GetMapping("/time")
    public List<String> getStartTime(@RequestParam("startdate") String startdate, @RequestParam("dest") String dest) {
        return resService.getStartTime(startdate, dest);
    }
    @GetMapping("/seat")
    public List<String> getSeat(@RequestParam("startdate") String startdate, @RequestParam("dest") String dest, @RequestParam("starttime") String starttime) {
        return resService.getSeat(startdate, dest, starttime);
    }
    @PostMapping("")
    public int Reservation(@RequestBody ResDto resDto) {
        try {
            System.out.println("resDto = " + resDto);
            return resService.Reservation(resDto);
        } catch (Exception e) {
            System.out.println(e);
            return 0;
        }
    }
    @GetMapping("/price")
    public int calculatePrice(@RequestParam String startdate,
                              @RequestParam String dest,
                              @RequestParam String starttime) {
        try {
            // 가격 계산 서비스 호출
            return resService.calculatePrice(startdate, dest, starttime);
        } catch (Exception e) {
            e.printStackTrace();  // 예외 로그 출력
            return 0;  // 예외 발생 시 0을 반환
        }
    }

}


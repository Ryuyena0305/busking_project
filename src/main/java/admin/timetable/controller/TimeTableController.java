package admin.timetable.controller;

import admin.timetable.model.dto.TimeTableDto;
import admin.timetable.service.TimeTableService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/timetable")
@CrossOrigin("http://192.168.40.10:5173")
public class TimeTableController {
    @Autowired
    private TimeTableService timeTableService;

    // 스케줄 등록
    @PostMapping
    public boolean create(@RequestBody TimeTableDto timeTableDto){
        System.out.println("TimeTableController.create");
        System.out.println("timeTableDto = " + timeTableDto);
        return timeTableService.create(timeTableDto);
    }


    // 스케줄 상세 조회(겸용)
    @GetMapping("/view")
    public TimeTableDto view(@RequestParam String timeid){
        System.out.println("TimeTableController.view");
        System.out.println("timeid = " + timeid);
        return timeTableService.view(timeid);
    }



    // 스케줄 수정
    @PutMapping("/view")
    public boolean update(@RequestBody TimeTableDto timeTableDto){
        System.out.println("TimeTableController.update");
        System.out.println("timeTableDto = " + timeTableDto);
        return timeTableService.update(timeTableDto);
    }



    // 스케줄 삭제
    @DeleteMapping("/view")
    public boolean delete(@RequestParam String timeid){
        System.out.println("TimeTableController.delete");
        System.out.println("timeid = " + timeid);
        return timeTableService.delete(timeid);
    }



    // (도착지별)스케줄 조회
    @GetMapping("/loc")
    public List<TimeTableDto> locView(@RequestParam int locid){
        System.out.println("TimeTableController.locView");
        System.out.println("locid = " + locid);
        return timeTableService.locView(locid);
    }


    // (버스별)스케줄 조회
    @GetMapping("/bus")
    public List<TimeTableDto> busView(@RequestParam int biid){
        System.out.println("TimeTableController.busView");
        System.out.println("biid = " + biid);
        return timeTableService.busView(biid);
    }


    // (일자별)스케줄 조회
    @GetMapping("/date")
    public List<TimeTableDto> dateView(@RequestParam String startdate){
        System.out.println("TimeTableController.dateView");
        System.out.println("date = " + startdate);
        return timeTableService.dateView(startdate);
    }

}

package busking.admin.timetable.controller;

import busking.admin.timetable.model.dto.TimeTableDto;
import busking.admin.timetable.service.TimeTableService;
import com.github.pagehelper.PageInfo;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/timetable")
@CrossOrigin("http://localhost:5173")
@RequiredArgsConstructor
public class TimeTableController {
    private final TimeTableService timeTableService;


    // 버스정보 가져오기
    @GetMapping("/getbus")
    public List<TimeTableDto> getBusInfo() {
        System.out.println("TimeTableController.getBusInfo");
        return timeTableService.getBusInfo();
    }

    // 터미널 정보 가져오기
    @GetMapping("/getloc")
    public List<TimeTableDto> getLoc() {
        System.out.println("TimeTableController.getTerminalInfo");
        return timeTableService.getLoc();
    }


    // 스케줄 등록
    @PostMapping
    public boolean create(@RequestBody TimeTableDto timeTableDto){
        System.out.println("TimeTableController.create");
        System.out.println("timeTableDto = " + timeTableDto);
        try{
            return timeTableService.create(timeTableDto);
        }catch (Exception e){
            System.out.println(e);
            return false;
        }
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
        try{
            return timeTableService.update(timeTableDto);
        }catch(Exception e){
            System.out.println(e);
            return false;
        }
    }



    // 스케줄 삭제
    @DeleteMapping("/view")
    public boolean delete(@RequestParam String timeid){
        System.out.println("TimeTableController.delete");
        System.out.println("timeid = " + timeid);
        try {
            return timeTableService.delete(timeid);
        }catch (Exception e){
            System.out.println(e);
            return false;
        }
    }



    // (도착지별)스케줄 조회
    @GetMapping("/view/loc")
    public PageInfo<TimeTableDto> locView(
            @RequestParam int locid,
            @RequestParam(defaultValue = "1", name = "page") int pageNum,
            @RequestParam(defaultValue = "10") int pageSize
    ){
        System.out.println("TimeTableController.locView");
        System.out.println("locid = " + locid + ", pageNum = " + pageNum + ", pageSize = " + pageSize);
        return timeTableService.locView(locid, pageNum, pageSize);
    }


    // (버스별)스케줄 조회
    @GetMapping("/view/bus")
    public PageInfo<TimeTableDto> busView(
            @RequestParam int biid,
            @RequestParam(defaultValue = "1", name = "page") int pageNum,
            @RequestParam(defaultValue = "10") int pageSize
    ){
        System.out.println("TimeTableController.busView");
        System.out.println("biid = " + biid + ", pageNum = " + pageNum + ", pageSize = " + pageSize);
        return timeTableService.busView(biid, pageNum, pageSize);
    }


    // (일자별)스케줄 조회
    @GetMapping("/view/date")
    public PageInfo<TimeTableDto> dateView(
            @RequestParam String startdate,
            @RequestParam(defaultValue = "1", name = "page") int pageNum,
            @RequestParam(defaultValue = "10") int pageSize
    ){
        System.out.println("TimeTableController.dateView");
        System.out.println("startdate = " + startdate + ", pageNum = " + pageNum + ", pageSize = " + pageSize);
        return timeTableService.dateView(startdate, pageNum, pageSize);
    }

}

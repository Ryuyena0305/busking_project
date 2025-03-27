package busking.admin.driver.controller;

import busking.admin.driver.model.dto.DriverDto;
import busking.admin.driver.service.DriverService;
import busking.admin.timetable.model.dto.TimeTableDto;
import com.github.pagehelper.PageInfo;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/driver")
@CrossOrigin("http://localhost:5173")
@RequiredArgsConstructor
public class DriverController {
    private final DriverService driverService;

    // 버스기사별 스케줄 로그
    @GetMapping("/timelog")
    public PageInfo<TimeTableDto> getTimeLog(
            @RequestParam int did,
            @RequestParam(defaultValue = "1", name = "page") int pageNum,
            @RequestParam(defaultValue = "10") int pageSize
    ) {
        System.out.println("DriverController.getTimeLog");
        System.out.println("did = " + did + ", pageNum = " + pageNum + ", pageSize = " + pageSize);
        return driverService.getTimeLog(did, pageNum, pageSize);
    }


    // 버스기사 정보 가져오기
    @GetMapping("/getdriver")
    public List<DriverDto> getDriverInfo() {
        System.out.println("DriverController.getDriverInfo");
        return driverService.getDriverInfo();
    }

    // 버스기사 등록
    @PostMapping
    public boolean create(DriverDto driverDto){
        System.out.println("DriverController.create");
        System.out.println("driverDto = " + driverDto);
        try {
            boolean result = driverService.create(driverDto);
            return result;
        }catch (Exception e){
            System.out.println(e);
            return false;
        }
    }


    // 버스기사 조회
    @GetMapping
    public PageInfo<DriverDto> findAll(
            @RequestParam(defaultValue = "1", name = "page") int pageNum,
            @RequestParam(defaultValue = "10") int pageSize
    ){
        System.out.println("DriverController.findAll");
        System.out.println("pageNum = " + pageNum + ", pageSize = " + pageSize);
        return driverService.findAll(pageNum, pageSize);
    }


    // 버스기사 상세 조회
    @GetMapping("/view")
    public DriverDto view(@RequestParam int did){
        System.out.println("DriverController.view");
        System.out.println("did = " + did);
        return driverService.view(did);
    }


    // 버스기사 수정
    @PutMapping
    public boolean update(@RequestBody DriverDto driverDto){
        System.out.println("DriverController.update");
        System.out.println("driverDto = " + driverDto);
        try{
            return driverService.update(driverDto);
        }catch (Exception e){
            System.out.println(e);
            return false;
        }
    }



    // 버스기사 삭제
    @DeleteMapping
    public boolean delete(@RequestParam int did){
        System.out.println("DriverController.delete");
        System.out.println("did = " + did);
        try{
            return driverService.delete(did);
        }catch (Exception e){
            System.out.println(e);
            return false;
        }
    }
}

package busking.admin.driver.controller;

import busking.admin.driver.model.dto.DriverDto;
import busking.admin.driver.service.DriverService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/driver")
@CrossOrigin("http://localhost:5173")
@RequiredArgsConstructor
public class DriverController {
    private final DriverService driverService;

    // 버스기사 등록
    @PostMapping
    public boolean create(@RequestBody DriverDto driverDto){
        System.out.println("DriverController.create");
        System.out.println("driverDto = " + driverDto);
        return driverService.create(driverDto);
    }


    // 버스기사 조회
    @GetMapping
    public List<DriverDto> findAll(){
        System.out.println("DriverController.findAll");
        System.out.println();
        return driverService.findAll();
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
        return driverService.update(driverDto);
    }



    // 버스기사 삭제
    @DeleteMapping
    public boolean delete(@RequestParam int did){
        System.out.println("DriverController.delete");
        System.out.println("did = " + did);
        return driverService.delete(did);
    }
}

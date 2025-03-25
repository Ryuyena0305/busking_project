package busking.admin.bus.controller;

import busking.admin.bus.model.BusDto;
import busking.admin.bus.service.BusService;
import com.github.pagehelper.PageInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/bus/businfo")
@CrossOrigin("http://localhost:5173")
public class BusController {
    @Autowired
    private BusService busService;

    @PostMapping("")
    public boolean onCreate(@RequestBody BusDto busDto){
        return busService.onCreate(busDto);
    }

    @GetMapping("")
    public PageInfo<BusDto> onRead(
            @RequestParam(defaultValue = "1", name = "page") int pageNum,
            @RequestParam(defaultValue = "10") int pageSize
    ){
        System.out.println("BusController.onRead");
        System.out.println("pageNum = " + pageNum + ", pageSize = " + pageSize);
        return busService.onRead(pageNum, pageSize);
    }
    @GetMapping("/view")
    public BusDto onView(@RequestParam int biid){
        return busService.onView(biid);
    }
    @PutMapping("")
    public boolean onUpdate(@RequestBody BusDto busDto){
        return busService.onUpdate(busDto);
    }
    @DeleteMapping("")
    public boolean onDelete(@RequestParam int biid){
        return busService.onDelete(biid);
    }
}

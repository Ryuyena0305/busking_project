package admin.bus.controller;

import admin.bus.model.BusDto;
import admin.bus.service.BusService;
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
    public List<BusDto> onRead(){
        return busService.onRead();
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

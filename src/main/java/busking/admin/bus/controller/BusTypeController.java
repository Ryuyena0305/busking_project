package busking.admin.bus.controller;

import busking.admin.bus.model.BusTypeDto;
import busking.admin.bus.service.BusTypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/bus/bustype")
@CrossOrigin("http://localhost:5173")
public class BusTypeController {
    @Autowired
    private BusTypeService busTypeService;
    @GetMapping("")
    public List<BusTypeDto> getBusTypes() {
        return busTypeService.getBusTypes();
    }
}

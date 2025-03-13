package admin.bus.controller;

import admin.bus.model.BusTypeDto;
import admin.bus.service.BusTypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/bustype")
public class BusTypeController {
    @Autowired
    private BusTypeService busTypeService;
    @GetMapping("")
    public List<BusTypeDto> getBusTypes() {
        return busTypeService.getBusTypes();
    }
}

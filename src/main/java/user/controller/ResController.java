package user.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import user.service.ResService;

import java.util.List;

@RestController
@RequestMapping("/resv")
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

}

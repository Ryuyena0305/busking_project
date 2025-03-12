package seat.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import seat.model.dto.SeatDto;
import seat.service.SeatService;

import java.util.List;

@RestController
@RequestMapping("/busseat")
public class SeatController {
    @Autowired
    private SeatService seatService;

    @GetMapping("")
    public List<SeatDto> onPost(@RequestParam("biid") int biid, SeatDto seatDto){
        System.out.println("SeatController.onPost");
        return seatService.onPost(biid,seatDto);
    }

    @PutMapping("")
    public int onUpdate(@RequestBody SeatDto seatDto){
        System.out.println("SeatController.onUpdate");
        System.out.println("seatDto = " + seatDto);
        return seatService.onUpdate(seatDto);
    }

}

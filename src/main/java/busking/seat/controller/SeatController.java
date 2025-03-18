package busking.seat.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import busking.seat.model.dto.SeatDto;
import busking.seat.service.SeatService;

import java.util.List;

@RestController
@RequestMapping("/busseat")
@CrossOrigin("http://localhost:5173")
public class SeatController {
    @Autowired
    private SeatService seatService;

    @PostMapping("")
    public int onPost(@RequestParam("biid") int biid, @ModelAttribute SeatDto seatDto) {
        System.out.println("SeatController.onPost");
        return seatService.onPost(biid, seatDto);
    }

    @GetMapping("")
    public List<SeatDto> onGet(@RequestParam("biid") int biid, SeatDto seatDto){
        System.out.println("SeatController.onGet");
        return seatService.onGet(biid,seatDto);
    }

    @PutMapping("")
    public int onUpdate(@RequestBody SeatDto seatDto){
        System.out.println("SeatController.onUpdate");
        System.out.println("seatDto = " + seatDto);
        return seatService.onUpdate(seatDto);
    }

}

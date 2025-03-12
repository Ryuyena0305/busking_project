package seat.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import seat.model.dto.SeatDto;
import seat.model.mapper.SeatMapper;

import java.util.List;

@Service
public class SeatService {
    @Autowired
    private SeatMapper seatMapper;


    public List<SeatDto> onPost(int biid, SeatDto seatDto){
        System.out.println("SeatController.onPost");
        System.out.println("seatDto = " + seatDto);
        return seatMapper.onPost(biid,seatDto);
    }


    public int onUpdate( SeatDto seatDto){
        System.out.println("SeatController.onUpdate");
        System.out.println("seatDto = " + seatDto);
        return seatMapper.onUpdate(seatDto);
    }
}

package busking.seat.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import busking.seat.model.dto.SeatDto;
import busking.seat.model.mapper.SeatMapper;

import java.util.List;

@Service
public class SeatService {
    @Autowired
    private SeatMapper seatMapper;

    public int onPost(int biid, SeatDto seatDto) {
        System.out.println("SeatService.onPost");
        return seatMapper.onPost(biid, seatDto);
    }

    public List<SeatDto> onGet(int biid, SeatDto seatDto){
        System.out.println("SeatController.onGet");
        System.out.println("seatDto = " + seatDto);
        return seatMapper.onGet(biid,seatDto);
    }


    public int onUpdate( SeatDto seatDto){
        System.out.println("SeatController.onUpdate");
        System.out.println("seatDto = " + seatDto);
        return seatMapper.onUpdate(seatDto);
    }
}

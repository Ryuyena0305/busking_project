package busking.admin.bus.service;

import busking.admin.bus.model.BusDto;
import busking.admin.bus.model.BusMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BusService {
    @Autowired
    private BusMapper busMapper;

    public boolean onCreate(BusDto busDto){
        return busMapper.onCreate(busDto);
    }
    public List<BusDto> onRead(){
        return busMapper.onRead();
    }
    public BusDto onView(int biid){
        return busMapper.onView(biid);
    }
    public boolean onUpdate(BusDto busDto){
        return busMapper.onUpdate(busDto);
    }
    public boolean onDelete(int biid){
        return busMapper.onDelete(biid);
    }
}

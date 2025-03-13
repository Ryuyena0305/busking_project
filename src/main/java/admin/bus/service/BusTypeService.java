package admin.bus.service;

import admin.bus.model.BusTypeDto;
import admin.bus.model.BusTypeMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BusTypeService {
    @Autowired
    private BusTypeMapper busTypeMapper;
    public List<BusTypeDto> getBusTypes() {
        return busTypeMapper.getBusTypes();
    }
}

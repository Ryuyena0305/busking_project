package busking.admin.driver.service;

import busking.admin.driver.model.dto.DriverDto;
import busking.admin.driver.model.mapper.DriverMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

@Service
@RequiredArgsConstructor
public class DriverService {
    private final DriverMapper driverMapper;

    // 버스기사 등록
    public boolean create(@RequestBody DriverDto driverDto){
        return driverMapper.create(driverDto);
    }


    // 버스기사 조회
    public List<DriverDto> findAll(){
        return driverMapper.findAll();
    }

    // 버스기사 상세 조회
    public DriverDto view(@RequestParam int did){
        return driverMapper.view(did);
    }


    // 버스기사 수정
    public boolean update(@RequestBody DriverDto driverDto){
        return driverMapper.update(driverDto);
    }


    // 버스기사 삭제
    public boolean delete(@RequestParam int did){
        return driverMapper.delete(did);
    }
}

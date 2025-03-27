package busking.admin.driver.service;

import busking.admin.driver.model.dto.DriverDto;
import busking.admin.driver.model.mapper.DriverMapper;
import busking.admin.resvlog.model.dto.ResvlogDto;
import busking.admin.timetable.model.dto.TimeTableDto;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(rollbackFor = Exception.class)
public class DriverService {
    private final DriverMapper driverMapper;

    private final FileService fileService;

    // 버스기사별 스케줄 로그
    public PageInfo<TimeTableDto> getTimeLog(int did, int pageNum, int pageSize){
        PageHelper.startPage(pageNum, pageSize); // 페이징 적용
        List<TimeTableDto> schedules = driverMapper.getTimeLog(did); // MyBatis 호출
        return new PageInfo<>(schedules); // 페이징 정보를 포함한 PageInfo 반환
    }


    // 버스기사 정보 가져오기
    public List<DriverDto> getDriverInfo() {
        return driverMapper.getDriverInfo();
    }

    // 버스기사 등록
    public boolean create(DriverDto driverDto) throws Exception{
        System.out.println("DriverService.create");
        System.out.println("driverDto = " + driverDto);
        try{
            if (driverDto.getDimg() == null) { }
            else {
                String filename = fileService.upload(driverDto.getDimg());
                driverDto.setDprofile(filename);
            }
            boolean result = driverMapper.create(driverDto);
            System.out.println("result = " + result);
            return result;
        }catch (Exception e){
            System.out.println(e);
            return false;
        }
    }


    // 버스기사 조회
    public PageInfo<DriverDto> findAll(int pageNum, int pageSize){
        PageHelper.startPage(pageNum, pageSize); // 페이징 적용
        List<DriverDto> schedules = driverMapper.findAll(); // MyBatis 호출
        return new PageInfo<>(schedules); // 페이징 정보를 포함한 PageInfo 반환
    }

    // 버스기사 상세 조회
    public DriverDto view(@RequestParam int did){
        return driverMapper.view(did);
    }


    // 버스기사 수정
    public boolean update(@RequestBody DriverDto driverDto) throws Exception{
        return driverMapper.update(driverDto);
    }


    // 버스기사 삭제
    public boolean delete(@RequestParam int did) throws Exception{
        return driverMapper.delete(did);
    }
}

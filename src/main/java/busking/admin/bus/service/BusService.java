package busking.admin.bus.service;

import busking.admin.bus.model.BusDto;
import busking.admin.bus.model.BusMapper;
import busking.admin.resvlog.model.dto.ResvlogDto;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class BusService {
    @Autowired
    private BusMapper busMapper;
    @Transactional(rollbackFor = Exception.class)
    public boolean onCreate(BusDto busDto) throws Exception{
        return busMapper.onCreate(busDto);
    }
    public PageInfo<BusDto> onRead(int pageNum, int pageSize){
        PageHelper.startPage(pageNum, pageSize); // 페이징 적용
        List<BusDto> schedules = busMapper.onRead(); // MyBatis 호출
        return new PageInfo<>(schedules); // 페이징 정보를 포함한 PageInfo 반환
    }
    public BusDto onView(int biid){
        return busMapper.onView(biid);
    }
    @Transactional(rollbackFor = Exception.class)
    public boolean onUpdate(BusDto busDto) throws Exception{
        return busMapper.onUpdate(busDto);
    }
    @Transactional(rollbackFor = Exception.class)
    public boolean onDelete(int biid) throws Exception{
        return busMapper.onDelete(biid);
    }
}

package busking.admin.resvlog.service;



import busking.admin.resvlog.model.dto.ResvlogDto;
import busking.admin.resvlog.model.mapper.ResvlogMapper;
import busking.admin.timetable.model.dto.TimeTableDto;
import busking.user.model.dto.ResDto;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ResvlogService {
    private final ResvlogMapper resvlogMapper;

    // 예매내역 전체 조회
    public PageInfo<ResvlogDto> findAll(int pageNum, int pageSize){
        PageHelper.startPage(pageNum, pageSize); // 페이징 적용
        List<ResvlogDto> schedules = resvlogMapper.findAll(); // MyBatis 호출
        return new PageInfo<>(schedules); // 페이징 정보를 포함한 PageInfo 반환
    }
}
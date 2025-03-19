package busking.admin.resvlog.service;



import busking.admin.resvlog.model.mapper.ResvlogMapper;
import busking.user.model.dto.ResDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ResvlogService {
    @Autowired
    private ResvlogMapper resvlogMapper;

    // 예매내역 전체 조회
    public List<ResDto> findAll(){
        return resvlogMapper.findAll();
    }
}
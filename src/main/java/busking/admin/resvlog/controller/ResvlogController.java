package busking.admin.resvlog.controller;


import busking.admin.resvlog.model.dto.ResvlogDto;
import busking.admin.resvlog.service.ResvlogService;
import busking.user.model.dto.ResDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/resvlog")
@CrossOrigin("http://localhost:5173")
public class ResvlogController {
    @Autowired
    private ResvlogService resvlogService;

    // 예매내역 전체 조회
    @GetMapping
    public List<ResvlogDto> findAll(){
        return resvlogService.findAll();
    }
}

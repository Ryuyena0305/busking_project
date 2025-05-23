package busking.admin.resvlog.controller;


import busking.admin.resvlog.model.dto.ResvlogDto;
import busking.admin.resvlog.service.ResvlogService;
import busking.user.model.dto.ResDto;
import com.github.pagehelper.PageInfo;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/resvlog")
@CrossOrigin("http://localhost:5173")
@RequiredArgsConstructor
public class ResvlogController {

    private final ResvlogService resvlogService;

    // 예매내역 전체 조회
    @GetMapping
    public PageInfo<ResvlogDto> findAll(
            @RequestParam(defaultValue = "1", name = "page") int pageNum,
            @RequestParam(defaultValue = "10") int pageSize
    ) {
        System.out.println("ResvlogController.findAll");
        System.out.println("pageNum = " + pageNum + ", pageSize = " + pageSize);
        return resvlogService.findAll(pageNum, pageSize);
    }
}

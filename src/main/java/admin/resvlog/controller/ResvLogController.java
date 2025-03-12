/*
package admin.resvlog.controller;

import admin.resvlog.service.ResvLogService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/resvlog")
@CrossOrigin("http://192.168.40.10:5173")
public class ResvLogController {
    @Autowired
    private ResvLogService resvLogService;

    // 예매내역 전체 조회
    @GetMapping
    public List<ResvDto> findAll(){
        return resvLogService.findAll();
    }
}
*/

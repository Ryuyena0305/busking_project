package busking.admin.timetable.controller;

import busking.admin.timetable.model.dto.ExcelDto;
import busking.admin.timetable.service.ExcelService;
import jakarta.servlet.http.HttpServletResponse;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/busking")
public class ExcelController {
    @Autowired
    ExcelService excelService;

    @GetMapping("/excel")
    public void downloadExcel(HttpServletResponse resp, @RequestParam("startdate") String startdate) throws IOException {
        // 엑셀 생성 및 다운로드는 서비스에서 처리
        excelService.generateExcel(resp, startdate);
    }

}

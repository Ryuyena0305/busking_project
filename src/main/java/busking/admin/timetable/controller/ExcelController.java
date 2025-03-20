package busking.admin.timetable.controller;



import busking.admin.timetable.model.dto.ExcelDto;
import busking.admin.timetable.service.ExcelService;
import jakarta.servlet.http.HttpServletResponse;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.io.IOException;
import java.util.List;


@Controller
public class ExcelController {
    @Autowired
    ExcelService excelService;

    @GetMapping("/excel")
    public void downloadExcel(HttpServletResponse resp,@RequestParam("startdate") String startdate) throws IOException {

        Workbook workbook = new HSSFWorkbook();
        // Workbook을 생성한다 ( 엑셀파일을 의미함)
        Sheet sheet = workbook.createSheet("당일 날짜 버스스케줄");
        //하나의 sheet를 만든다
        int rowNo = 0;

        Row headerRow = sheet.createRow(rowNo++);
        headerRow.createCell(0).setCellValue("타임테이블 번호");
        headerRow.createCell(1).setCellValue("도착지");
        headerRow.createCell(2).setCellValue("출발시간");
        headerRow.createCell(3).setCellValue("버스번호");
        headerRow.createCell(4).setCellValue("기사 이름");

        List<ExcelDto> list = excelService.findAll(startdate);
        for (ExcelDto Excel : list) {
            Row row = sheet.createRow(rowNo++);
            row.createCell(0).setCellValue(Excel.getTimeid());
            row.createCell(1).setCellValue(Excel.getDest());
            row.createCell(2).setCellValue(Excel.getStarttime());
            row.createCell(3).setCellValue(Excel.getBinum());
            row.createCell(4).setCellValue(Excel.getDriver());
        }

        resp.setContentType("ms-vnd/excel");
        resp.setHeader("Content-Disposition", "attachment;filename=boardlist.xls");

        workbook.write(resp.getOutputStream());
        workbook.close();

    }


}

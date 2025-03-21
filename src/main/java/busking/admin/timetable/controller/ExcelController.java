package busking.admin.timetable.controller;

import busking.admin.timetable.model.dto.ExcelDto;
import busking.admin.timetable.service.ExcelService;
import jakarta.servlet.http.HttpServletResponse;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/busking")
public class ExcelController {
    @Autowired
    ExcelService excelService;

    @GetMapping("/excel")
    public void downloadExcel(HttpServletResponse resp, @RequestParam("startdate") String startdate) throws IOException {

        Workbook workbook = new HSSFWorkbook();
        Sheet sheet = workbook.createSheet(startdate + " 버스 스케줄");
        int rowNo = 0;

        // (1) 스타일 설정
        // 헤더 스타일 (네이비 배경 + 흰색 글씨 + 가운데 정렬)
        Font headerFont = workbook.createFont();
        headerFont.setBold(true);
        headerFont.setColor(IndexedColors.WHITE.getIndex()); // 흰색 글씨

        CellStyle headerStyle = workbook.createCellStyle();
        headerStyle.setFont(headerFont);
        headerStyle.setAlignment(HorizontalAlignment.CENTER);
        headerStyle.setFillForegroundColor(IndexedColors.DARK_BLUE.getIndex()); // 네이비 배경
        headerStyle.setFillPattern(FillPatternType.SOLID_FOREGROUND);

        // (2) 기본 가운데 정렬 스타일
        CellStyle centerStyle = workbook.createCellStyle();
        centerStyle.setAlignment(HorizontalAlignment.CENTER);
        centerStyle.setBorderBottom(BorderStyle.THIN); //아래선 설정
        centerStyle.setBorderLeft(BorderStyle.THIN); //왼쪽선 설정
        centerStyle.setBorderRight(BorderStyle.THIN); //오른쪽선 설정
        centerStyle.setBorderTop(BorderStyle.THIN); //위에선 설정

        // (3) 헤더 생성 및 스타일 적용
        Row headerRow = sheet.createRow(rowNo++);
        String[] headers = {"타임테이블 번호", "도착지", "출발시간", "버스번호", "기사 이름"};

        for (int i = 0; i < headers.length; i++) {
            headerRow.createCell(i).setCellValue(headers[i]);
            headerRow.getCell(i).setCellStyle(headerStyle); // 헤더 스타일 적용
        }

        // (4) 데이터 삽입
        List<ExcelDto> list = excelService.View(startdate);
        for (ExcelDto excel : list) {
            Row row = sheet.createRow(rowNo++);

            row.createCell(0).setCellValue(excel.getTimeid());
            row.createCell(1).setCellValue(excel.getDest());
            row.createCell(2).setCellValue(excel.getStarttime());
            row.createCell(3).setCellValue(excel.getBinum());
            row.createCell(4).setCellValue(excel.getDriver());

            // 모든 셀에 가운데 정렬 적용
            for (int i = 0; i < row.getLastCellNum(); i++) {
                row.getCell(i).setCellStyle(centerStyle);
            }
        }

        // (5) 컬럼 너비 조정
        sheet.setColumnWidth(0, 3000); // 타임테이블 번호
        sheet.setColumnWidth(1, 5000); // 도착지
        sheet.setColumnWidth(2, 5000); // 출발시간
        sheet.setColumnWidth(3, 4000); // 버스번호
        sheet.setColumnWidth(4, 5000); // 기사 이름

        // (6) 엑셀 다운로드 설정
        resp.setContentType("application/vnd.ms-excel");
        resp.setHeader("Content-Disposition", "attachment; filename=\"" + startdate + "_bus_list.xls\"");

        workbook.write(resp.getOutputStream());
        workbook.close();
    }

//    @PostMapping("/post/excel")

}

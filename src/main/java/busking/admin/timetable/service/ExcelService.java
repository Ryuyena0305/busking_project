package busking.admin.timetable.service;

import busking.admin.timetable.model.dto.ExcelDto;
import busking.admin.timetable.model.mapper.ExcelMapper;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import jakarta.servlet.http.HttpServletResponse;

import java.io.FileOutputStream;
import java.io.IOException;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;

@Service
public class ExcelService {
    @Autowired
    ExcelMapper excelMapper;

//    public List<ExcelDto> findAll(String startdate){
//        return excelMapper.findAll(startdate);
//    }

    public List<ExcelDto> View(String startdate){
        return excelMapper.View(startdate);
    }


    public void generateExcel(HttpServletResponse resp, String startdate) throws IOException {
        Workbook workbook = new HSSFWorkbook();
        Sheet sheet = workbook.createSheet(startdate + " 버스 스케줄");
        int rowNo = 0;

        // (1) 스타일 설정
        Font headerFont = workbook.createFont();
        headerFont.setBold(true);
        headerFont.setColor(IndexedColors.WHITE.getIndex());

        CellStyle headerStyle = workbook.createCellStyle();
        headerStyle.setFont(headerFont);
        headerStyle.setAlignment(HorizontalAlignment.CENTER);
        headerStyle.setFillForegroundColor(IndexedColors.DARK_BLUE.getIndex());
        headerStyle.setFillPattern(FillPatternType.SOLID_FOREGROUND);

        CellStyle centerStyle = workbook.createCellStyle();
        centerStyle.setAlignment(HorizontalAlignment.CENTER);
        centerStyle.setBorderBottom(BorderStyle.THIN);
        centerStyle.setBorderLeft(BorderStyle.THIN);
        centerStyle.setBorderRight(BorderStyle.THIN);
        centerStyle.setBorderTop(BorderStyle.THIN);

        Row headerRow = sheet.createRow(rowNo++);
        String[] headers = {"타임테이블 번호", "도착지", "출발시간", "버스번호", "기사 이름"};

        for (int i = 0; i < headers.length; i++) {
            headerRow.createCell(i).setCellValue(headers[i]);
            headerRow.getCell(i).setCellStyle(headerStyle);
        }

        List<ExcelDto> list = View(startdate);
        for (ExcelDto excel : list) {
            Row row = sheet.createRow(rowNo++);
            row.createCell(0).setCellValue(excel.getTimeid());
            row.createCell(1).setCellValue(excel.getDest());
            row.createCell(2).setCellValue(excel.getStarttime());
            row.createCell(3).setCellValue(excel.getBinum());
            row.createCell(4).setCellValue(excel.getDname());

            for (int i = 0; i < row.getLastCellNum(); i++) {
                row.getCell(i).setCellStyle(centerStyle);
            }
        }

        sheet.setColumnWidth(0, 3000);
        sheet.setColumnWidth(1, 5000);
        sheet.setColumnWidth(2, 5000);
        sheet.setColumnWidth(3, 4000);
        sheet.setColumnWidth(4, 5000);

        resp.setContentType("application/vnd.ms-excel");
        resp.setHeader("Content-Disposition", "attachment; filename=" + startdate + "_bus_list.xls");

        workbook.write(resp.getOutputStream());
        workbook.close();
    }


    public List<ExcelDto> justDown() {

        return excelMapper.justDown();
    }

//    @Scheduled(cron = "*/3 * * * * *")
//    public void generatedateExcel() throws IOException {
//        LocalDate currentDate = LocalDate.now();
//
//        // 원하는 포맷 정의 (yyyy-MM-dd)
//        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
//
//        // 날짜를 문자열로 포맷팅
//        String formattedDate = currentDate.format(formatter);
//        String startdate = formattedDate;
//
//        // 엑셀 워크북 생성
//        Workbook workbook = new HSSFWorkbook();
//        Sheet sheet = workbook.createSheet(startdate + " 버스 스케줄");
//        int rowNo = 0;
//
//        // 스타일 설정
//        Font headerFont = workbook.createFont();
//        headerFont.setBold(true);
//        headerFont.setColor(IndexedColors.WHITE.getIndex());
//
//        CellStyle headerStyle = workbook.createCellStyle();
//        headerStyle.setFont(headerFont);
//        headerStyle.setAlignment(HorizontalAlignment.CENTER);
//        headerStyle.setFillForegroundColor(IndexedColors.DARK_BLUE.getIndex());
//        headerStyle.setFillPattern(FillPatternType.SOLID_FOREGROUND);
//
//        CellStyle centerStyle = workbook.createCellStyle();
//        centerStyle.setAlignment(HorizontalAlignment.CENTER);
//        centerStyle.setBorderBottom(BorderStyle.THIN);
//        centerStyle.setBorderLeft(BorderStyle.THIN);
//        centerStyle.setBorderRight(BorderStyle.THIN);
//        centerStyle.setBorderTop(BorderStyle.THIN);
//
//        // 헤더 작성
//        Row headerRow = sheet.createRow(rowNo++);
//        String[] headers = {"타임테이블 번호", "도착지", "출발시간", "버스번호", "기사 이름"};
//
//        for (int i = 0; i < headers.length; i++) {
//            headerRow.createCell(i).setCellValue(headers[i]);
//            headerRow.getCell(i).setCellStyle(headerStyle);
//        }
//
//        // 예시 데이터
//        List<ExcelDto> list = justDown();
//
//        // 데이터 행 작성
//        for (ExcelDto excel : list) {
//            Row row = sheet.createRow(rowNo++);
//            row.createCell(0).setCellValue(excel.getTimeid());
//            row.createCell(1).setCellValue(excel.getDest());
//            row.createCell(2).setCellValue(excel.getStarttime());
//            row.createCell(3).setCellValue(excel.getBinum());
//            row.createCell(4).setCellValue(excel.getDname());
//
//            for (int i = 0; i < row.getLastCellNum(); i++) {
//                row.getCell(i).setCellStyle(centerStyle);
//            }
//        }
//
//        // 컬럼 너비 조정
//        sheet.setColumnWidth(0, 3000);
//        sheet.setColumnWidth(1, 5000);
//        sheet.setColumnWidth(2, 5000);
//        sheet.setColumnWidth(3, 4000);
//        sheet.setColumnWidth(4, 5000);
//
//        // 서버에 파일 저장
//        String filePath = "C:/your-path/" + startdate + "_bus_list.xls"; // 저장할 경로 설정
//        try (FileOutputStream fileOut = new FileOutputStream(filePath)) {
//            workbook.write(fileOut);
//        }
//
//        workbook.close();
//        System.out.println("엑셀 파일이 서버에 저장되었습니다: " + filePath);
//        System.out.println(list);
//    }
}

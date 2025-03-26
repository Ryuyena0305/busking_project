package busking.admin.timetable.controller;

import busking.admin.timetable.model.dto.PostExcelDto;
import busking.admin.timetable.service.PostExcelService;
import org.apache.commons.io.FilenameUtils;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.text.SimpleDateFormat;
import org.apache.poi.ss.usermodel.Cell;

import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;

@RestController
@CrossOrigin("http://localhost:5173")
public class PostExcelController {

    @Autowired
    private PostExcelService postExcelService;  // 서비스 주입

    @GetMapping("/excel")
    public String main(){
        return "excel";
    }

    @PostMapping("/excel/read")
    public String insertExcelData(@RequestParam("file") MultipartFile file, Model model) throws IOException {
        // 파일이 없을 경우 처리
        if (file.isEmpty()) {
            model.addAttribute("error", "파일을 선택해주세요.");
            return "excel";
        }

        // 파일 형식 확인
        String extension = FilenameUtils.getExtension(file.getOriginalFilename());
        if (!extension.equals("xlsx") && !extension.equals("xls")) {
            model.addAttribute("error", "엑셀 파일만 업로드 가능합니다.");
            return "excel";
        }

        Workbook workbook = null;
        if (extension.equals("xlsx")) {
            workbook = new XSSFWorkbook(file.getInputStream());
        } else if (extension.equals("xls")) {
            workbook = new HSSFWorkbook(file.getInputStream());
        }

        Sheet worksheet = workbook.getSheetAt(0);
        List<PostExcelDto> dataList = new ArrayList<>();

        // getLastRowNum을 사용하여 실제 마지막 행 번호 기준으로 읽기
        int lastRowNum = worksheet.getLastRowNum();  // 실제 마지막 행 번호

        for (int i = 1; i <= lastRowNum; i++) {  // lastRowNum까지 반복
            Row row = worksheet.getRow(i);
            if (row == null) continue;  // 빈 행을 건너뛰기

            PostExcelDto data = new PostExcelDto();

            // 셀 데이터 읽기
            data.setStartDate(getCellValue(row, 0)); // 출발 날짜
            data.setStartTime(getCellValue(row, 1)); // 출발 시간
            data.setBinum(getCellValue(row, 2));    // 버스 번호
            data.setDest(getCellValue(row, 3));     // 도착지
            data.setDname(getCellValue(row, 4));    // 이름

            dataList.add(data);
        }

        // 데이터베이스에 삽입
        postExcelService.insertExcelData(dataList);  // 서비스 호출하여 데이터 삽입

        model.addAttribute("datas", dataList);
        return "excelList";
    }


    // 셀 값 읽기 (Null 체크 및 타입에 맞게 변환)


    private String getCellValue(Row row, int cellIndex) {
        if (row.getCell(cellIndex) != null) {
            // 셀의 타입에 따라 적절한 값을 반환
            switch (row.getCell(cellIndex).getCellType()) {
                case STRING:
                    return row.getCell(cellIndex).getStringCellValue();
                case NUMERIC:
                    // 날짜 형식일 경우
                    if (org.apache.poi.ss.usermodel.DateUtil.isCellDateFormatted(row.getCell(cellIndex))) {
                        // 날짜 형식으로 변환
                        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
                        return sdf.format(row.getCell(cellIndex).getDateCellValue());
                    } else {
                        return String.valueOf(row.getCell(cellIndex).getNumericCellValue());  // 숫자 값 반환
                    }
                default:
                    return "";  // 기본적으로 빈 문자열 반환
            }
        }
        return "";  // 셀이 비어있는 경우 빈 문자열 반환
    }

}

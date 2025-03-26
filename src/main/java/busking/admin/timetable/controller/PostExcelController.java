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
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@RestController
public class PostExcelController {

    @Autowired
    private PostExcelService postExcelService;  // 서비스 주입

    @GetMapping("/excel")
    public String main(){
        return "excel";
    }

    @PostMapping("/excel/read")
    public String readExcel(@RequestParam("file") MultipartFile file, Model model) throws IOException {
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
        for (int i = 1; i < worksheet.getPhysicalNumberOfRows(); i++) {
            Row row = worksheet.getRow(i);
            if (row == null) continue;  // 빈 행을 건너뛰기

            PostExcelDto data = new PostExcelDto();

            // 셀 데이터 읽기
            data.setStartDate(getCellValue(row, 0)); // 출발 날짜
            data.setStartTime(getCellValue(row, 1)); // 출발 시간
            data.setBinum(getCellValue(row, 2));    // 버스 번호
            data.setDest(getCellValue(row, 3));     // 도착지

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
                    // 숫자 형식일 경우, 숫자 값을 반환
                    if (org.apache.poi.ss.usermodel.DateUtil.isCellDateFormatted(row.getCell(cellIndex))) {
                        return row.getCell(cellIndex).getDateCellValue().toString();  // 날짜일 경우 날짜 문자열 반환
                    } else {
                        return String.valueOf(row.getCell(cellIndex).getNumericCellValue());  // 숫자일 경우 숫자 값 반환
                    }
                case BOOLEAN:
                    return String.valueOf(row.getCell(cellIndex).getBooleanCellValue());
                default:
                    return "";  // 기본적으로 빈 문자열 반환
            }
        }
        return "";  // 셀이 비어있는 경우 빈 문자열 반환
    }
}

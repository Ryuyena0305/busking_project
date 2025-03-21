package busking.admin.timetable.service;

import busking.admin.timetable.model.dto.ExcelDto;
import busking.admin.timetable.model.mapper.ExcelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

@Service
public class ExcelService {
    @Autowired
    ExcelMapper excelMapper;

    public List<ExcelDto> findAll(String startdate){

        return excelMapper.findAll(startdate);
    }


    public List<ExcelDto> View(String startdate){
        System.out.println("ExcelService.View");
        System.out.println("startdate = " + startdate);
        return excelMapper.View(startdate);
    }






}

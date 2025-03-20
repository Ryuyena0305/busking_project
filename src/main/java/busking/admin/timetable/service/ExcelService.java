package busking.admin.timetable.service;

import busking.admin.timetable.model.dto.ExcelDto;
import busking.admin.timetable.model.mapper.ExcelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ExcelService {
    @Autowired
    ExcelMapper excelMapper;

    public List<ExcelDto> findAll(String startdate){
        return excelMapper.findAll(startdate);
    }





}

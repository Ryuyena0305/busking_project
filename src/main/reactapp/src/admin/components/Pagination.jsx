import React from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";


export default function PaginationComponent (props) {
    console.log(props);
    return (<>
        <Stack spacing={2} className="page" sx={{ display: 'flex', justifyContent: 'center' }}>
            <Pagination shape="rounded"
                count={props.count} // 총 페이지 수
                page={props.page} // 현재 페이지
                onChange={props.onChange} // 페이지 변경 핸들러
            />
        </Stack>
    </>)
}
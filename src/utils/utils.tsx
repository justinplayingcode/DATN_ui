import { TooltipHost, TooltipOverflowMode } from "@fluentui/react"
import { ScheduleRequestStatus } from "src/model/enum"

export const tooltipPlainText = ( content: string, extraClassName?: string, id?: string) => {
  if(content === "") {
    return <div>--</div>
  }
  return (
    <div style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'}}>
      <TooltipHost
        content={content}
        closeDelay={200}
        overflowMode={TooltipOverflowMode.Parent}
        hostClassName={extraClassName}
      >
        <span id={id}>{content}</span>
    </TooltipHost>
    </div>
  )
}

export const basicKeyValueRender = (key, value) => {
  return (
    <div className='basicInfoRender'
      style={{display: "flex", justifyContent: "space-between", minWidth: "160px", height: "36px", margin: "0 0 4px 20px"}}
    >
      <div className='key'
        style={{ width: "30%", minWidth: "132px", backgroundColor: "rgb(243,243,243)", display: "flex", alignItems: "center", paddingLeft: "8px", fontWeight: "600", fontSize: '16px' }}
      >{key}</div>
      <div className='value'
        style={{ width: "60%", display: "flex", alignItems: "center", paddingLeft: "8px", fontSize: '16px'}}
      >{value}</div>
    </div>
  )
}

export const getStatusRequestSchedule = (type: ScheduleRequestStatus) => {
  let text;
  let colorText;
  switch(type) {
    case ScheduleRequestStatus.accpect:
      text = "Chấp nhận";
      colorText = "RGBA( 50, 205, 50, 1 )";
      break;
    case ScheduleRequestStatus.wait:
      text = "Chờ xác nhận";
      colorText = "RGBA( 218, 165, 32, 1 )";
      break;
    case ScheduleRequestStatus.reject:
      text = "Từ chối";
      colorText = "RGBA( 220, 20, 60, 1 )";
      break;
  }

  return <span style={{color: colorText}}>{text}</span>

}

export const basicDoubleKeyValueRender = (key, value1, value2) => {
  return (
    <div className='basicInfoRender'
      style={{display: "flex", justifyContent: "space-between", minWidth: "160px", height: "36px", margin: "0 0 4px 20px"}}
    >
      <div className='key'
        style={{ width: "30%", minWidth: "132px", backgroundColor: "rgb(243,243,243)", display: "flex", alignItems: "center", paddingLeft: "8px", fontWeight: "600", fontSize: '16px' }}
      >{key}</div>
      <div className='value'
        style={{ width: "60%", display: "flex", flexDirection: "column", alignItems: "center", paddingLeft: "8px", fontSize: '16px'}}
      >
        <div>{value1}</div>
        <div>{value2}</div>
      </div>
    </div>
  )
}
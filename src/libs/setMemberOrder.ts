const setDescAsc = params => {
  return params.order === 'DESC' ? 'DESC' : 'ASC'
}

export const setMemberOrder = (query, params) => {
  //default: order by name
  if (!params.orderType && !params.order) {
    query.orderBy('member.firstName')
  }

  if (params.orderType === 'name') {
    query.orderBy('member.firstName', setDescAsc(params))
  }

  if (params.orderType === 'expiration') {
    query.orderBy('member.endDate', setDescAsc(params))
  }

  if (params.orderType === 'points') {
    query.orderBy('member.activityPoints', setDescAsc(params), 'NULLS LAST')
  }

  if (params.orderType === 'activityRate') {
    query.orderBy('member.attendanceRate', setDescAsc(params), 'NULLS LAST')
  }
}

// ----------------------------------------------------------------------

export type FundManager = {
  fund_manager_id: number;
  fund_manager_name: string;
  fund_manager_phone: string;
  fund_manager_mail_address: string;
  fund_manager_birth_date: Date;
}

export type Fund = {
  fund_id: number;
  fund_name: string;
  fund_inception_date: Date;
  fund_manager: FundManager;
}

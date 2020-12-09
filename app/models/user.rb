class User < ApplicationRecord
  has_secure_password

  validates_presence_of :email, length: { maximum: 50 },
                                presence: true,
                                uniqueness: true,
                                format: { with: URI::MailTo::EMAIL_REGEXP }

end

class User < ApplicationRecord
  has_many :manifests
  has_secure_password

  validates :email, length: { maximum: 50 },
                                presence: true,
                                uniqueness: true,
                                format: { with: URI::MailTo::EMAIL_REGEXP }

end

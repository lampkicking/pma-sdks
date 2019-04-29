require 'openssl'
def validate(query = {})
    OpenSSL::HMAC.digest(OpenSSL::Digest.new('sha256'), @secret, "#{params.map{|k,v| "#{k}=#{v}"}.join('&')}")
end
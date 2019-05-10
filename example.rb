require 'openssl'
def validate(query = {})
    cid = query[:cid]
    msg "#{params.map{|k,v| "#{k}=#{v}"}.join('&')}"
    OpenSSL::HMAC.digest(OpenSSL::Digest.new('sha256'), @secret, msg)
end